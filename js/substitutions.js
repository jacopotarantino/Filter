// obtained from http://stackoverflow.com/questions/6012163/whats-a-good-alternative-to-html-rewriting/6012345#6012345
// rewrite unwanted phrases in 
jQuery.fn.textWalk = function( fn ) {
  this.contents().each( jwalk );
  function jwalk() {
    var node = this.nodeName.toLowerCase();
    if( node === '#text' ) {
      fn.call( this );
    } else if( this.nodeType === 1 && this.childNodes && this.childNodes[0] && node !== 'script' && node !== 'textarea' ) {
      $(this).contents().each( jwalk );
    }
  }
  return this;
};

// here's where we substitute words and phrases.
function replacing () {
  $('body').textWalk(function() {
    for (var i = replacements.length - 1; i >= 0; i--) {
      original = RegExp("\\b" + replacements[i].selector + "\\b", 'ig');
      this.data = this.data.replace(original, replacements[i].substitute);
    }
  });
}

// take the storage calls out of the walking to improve speed.
var that = this;
var replacements = [];
chrome.storage.sync.get('filter.substitutions', function (results) {
  replacements = results['filter.substitutions'];

  replacing.call(that);
});

var removeElement = function(el) {
  el.parentNode.removeChild(el);
};


// ids and classes of things we hate.
var annoyances = '';
chrome.storage.sync.get('filter.selectors', function (results) {
  results['filter.selectors'].forEach(function (val, ind, arr) {
    annoyances += val.name + ', ';
  });
  if (annoyances.length)
    annoyances = annoyances.slice(0,-2);

  // some things need to be said more than once.
  window.setTimeout(function() {
    Array.prototype.forEach.call(
      document.querySelectorAll(annoyances), function(el) {
      removeElement(el);
    });
  }, 1200);
});

// load in any custom js
chrome.storage.sync.get('filter.customjs', function (results) {
  eval(results['filter.customjs'].text);
});


