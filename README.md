# Serialize

Manipulate block elements as if they were text.

## Installation

```
$ npm install serialize-elem
```

## Motivation

Serialize's primary use case is in-browser rich text editing. The tree structure of HTML documents can be a pain to work with; Serialize aims to abstract away some of the difficulties by allowing you to manipulate block elements as if they were text. Inline stylings are stored as markups that can be applied to the text.

## API

### var serialization = new Serialize( element )

Serializes the element into an object. Example:

```html
<p>Some <b>bold</b> and <em>italic</em> text</p>
```

gets converted to:

```js
{
    type: 'p'
    text: 'Some bold and italic text',
    length: 25,
    markups: [{
        type: Serialize.types.bold,
        start: 5,
        end: 9
    }, {
        type: Serialize.types.italic,
        start: 14,
        end: 20
    }]
}
```

Where `Serialize.types.*` is a number. Currently, only `<code>`, `<a>`, and various italic and bold types (elements, like `<b>`, `<strong>`, etc, but also other elements with, say, `style="font-weight: bold"`) are supported. If you need to support a broader range of inline elements, adding support is trivial.

__NOTE__: newer versions of Serialize use getters and setters to automagically update the `length` property of a serialization when its text is changed. Be careful when manually updating the `length` property; in most cases, there should be no reason to do so. See [below][compat] for notes about browser support.

### serialization.addMarkups( markups )

Adds the array of markups to the serialization’s markups, ordering them first by type, then by start index, then by end index. This method is chainable.

### serialization.removeMarkup( markup )

Removes or truncates a serialization’s markups such that no markups of the same type as the given markup overlap the given markup’s range.

__Note__: for the link type, this method does not check the href. Be careful with it.

### serialization.mergeAdjacent( )

Merges adjacent or overlapping markups of the same type. If you've recently added a markup, you should call this method to normalize things.

### serialization.toElement( )

Return a new element resembling the one that was serialized.

### serialization.replace( pattern, substr )

Works like [`String#replace`][replace] on the serialization’s text, but updates the markups appropriately. Same signature as [`String#replace`][replace].

__Note__: unlike [`String#replace`][replace], `Serialize#replace` does __not__ returns a new serialization; rather, it mutates the existing serialization. It returns the context to allow chaining.

If a match overlaps a markup, that markup is truncated so as to make it smaller. Consider the following element:

```html
<p>One..<em>. two</em></p>
```

This gets serialized as:

```js
{
    type: 'p',
    text: 'One... two',
    length: 10,
    markups: [{
        type: Serialize.types.italic,
        start: 5,
        end: 10
    }]
}
```

Replacing adjacent periods with ellipses by calling

```js
.replace(/\.\.\./, '…')
```

on this serialization results in the following:

```js
{
    type: 'p',
    text: 'One… two',
    length: 8,
    markups: [{
        type: Serialize.types.italic,
        start: 4,
        end: 8
    }]
}
```

which, when converted back to en element, will look like:

```html
<p>One…<em> two</em></p>
```

### serialization.substr( start [, length] )

Works the same as [`String#substr`][substr]. Returns a new serialization representing the duplicated substring, complete with the appropriate markups.

### serialization.substring( start [, end] )

Like [`String#substring`][substring]. Returns a new serialization.

### serialization.append( other )

Returns a new serialization which results from appending the serialization `other` to the serialization this method was called upon. If we’re comparing serializations to text:

```js
var result = serialization.append(other)

// Is similar to:
var result = string + otherString
```

### serialization.equals( other )

Returns a boolean; true if the serializations are equivalent (i.e. they would produce identical elements by calling [`Serialize#toElement`][toElement]), false otherwise. Continuing the comparison to Strings, `Serialize#equals` is like the `==(=)` operator.

```js
var areSame = serialization.equals(other)

// Is like:
var areSame = string === otherString
```

### Serialize.fromText( text [, tag] )

Creates a serialization with the given string. The serialization will have no markups. Another string can optionally be passed in as a second parameter to determine the type of the resulting serialization, defaulting to `p`.

### Serialize.fromJSON( )

If you have previously `JSON.stringify`’d a serialization, you can convert it to a “live” instance of Serialize by using this method.

## Browser compatibility

Because of Serialize’s use of getters and setters, the latest version of Serialize will not work in legacy browsers. More specifically, Serialize will only work in:

| Browser | Version |
| --- | :---: |
| Firefox | `>= 4` |
| Chrome | `>= 5` |
| Internet Explorer | `>= 9` |
| Opera | `>= 11.60` |
| Safari | `>= 5.1` |

(Based on Mozilla Developer Network’s compatibility tables for [`Object.defineProperty`][prop])

If you need wider support, version one (on the `legacy` branch) is still supported; the only difference is the lack of getters and setters, so you’ll have to manually manage the `length` property when you directly update a serialization’s text.

## License

MIT.

[compat]: #browser-compatibility
[replace]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
[substr]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring
[substring]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/substring
[toElement]: #serializationtoelement-
[prop]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Browser_compatibility
