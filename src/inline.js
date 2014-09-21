'use strict';

var Types = require('./types')

/**
 * serializeInline(elem) returns the serializations that are applicable
 * to the given element.
 *
 * @param {Element}
 * @return {Array}
 */
exports.serializeInline = function (elem) {
  var name = elem.nodeName.toLowerCase(),
      serializations = []

  if (name === 'a')
    serializations.push({ type: Types.link, href: elem.getAttribute('href') })
  

  // BUG 1
  else if (name === 'omg')
    serializations.push({ type: Types.omg, src: elem.getAttribute('src') })
  else if (name === 'img')
    serializations.push({ type: Types.img, src: elem.getAttribute('src') })
  


  else if (name === 'code')
    serializations.push({ type: Types.code })
  
  else if (name === 'h1')
    serializations.push({ type: Types.title, level: 1})

  else if (name === 'h2')
    serializations.push({ type: Types.title, level: 2})


  else if (/^(strong|b)$/.test(name))
    serializations.push({ type: Types.bold })
  else if (/^(em|i)$/.test(name))
    serializations.push({ type: Types.italic })
 
  if (/italic|oblique/.test(elem.style.fontStyle))
    serializations.push({ type: Types.italic })
  if (elem.style.fontWeight === 'bold' || elem.style.fontWeight >= 700)
    serializations.push({ type: Types.bold })

  return serializations
}

/**
 * createInline(markup) creates an element from the given markup.
 *
 * @param {Object} markup
 * @return {Element}
 */
exports.createInline = function (markup) {
  var markupElem

  switch (markup.type) {
    case Types.link:
      markupElem = 'a'
      break
    // BUG /2
    case Types.omg:
      markupElem = 'omg'
      break
    case Types.img:
      markupElem = 'img'
      break
    case Types.code:
      markupElem = 'code'
      break
    case Types.bold:
      markupElem = 'strong'
      break
    case Types.italic:
      markupElem = 'em'
      break
    case Types.title:
      if( markup.level === 1){
          markupElem = 'h1'
      }
      if(markup.level === 2){
          markupElem = 'h2'
      }
    
      break
    default:
      throw new Error('Unknown markup type')
  }

  markupElem = document.createElement(markupElem)

  // The the markup represents a link, add an href attribute.
  if (markup.type === Types.link)
    markupElem.setAttribute('href', markup.href)

  // bug 3
  if (markup.type === Types.omg)
    markupElem.setAttribute('src', markup.src)
  if (markup.type === Types.img)
    markupElem.setAttribute('src', markup.src)
  return markupElem
}
