# react-schema-views

`npm install react-schema-views`

This library constructs React elements from JSON by mapping JSON definitions to React components that you expose.

JSX is not a dependency for react-schema-views.

[Quick Documentation](https://github.com/ineffablep/react-schema-views)

### Full Documentation

* [Schema](#schema)
* [Dynamic Children and Keys](#dynamic-children-and-keys)
* [Component Mapping](#component-mapping)
* [Rendering](#rendering)
* [Complete Example](#complete-example)

#### Schema

The primary resource needed is a defined schema in JSON or a JavaScript object literal. It's recommended that schema attributes mainly define React component props. The parser explicitly handles the following attributes:
- **component**: _MUST_ exist and be defined by a string or React component (must be a string if describing a native HTML tag)
- **children**: _MAY_ exist to define sub-components
- **text**: _MAY_ exist to as a string to define inner HTML text
- **key**: _MAY_ exist to define a key for dynamic children

Example JSON schema (ES6)
```js
{
      "component": "h2",
      "className": "text-center",
      "text": "Schema Driven Contact From!",
      "children": [
            {
                  "component": "ContactForm",
                  "title": "Tell us a little about yourself, we\"d appreciate it",
                  "children": [
                        {
                              "component": "StringField",
                              "componentPath": "../demo/Components/StringField",
                              "label": "What\"s your name",
                              "name": "fullname",
                              "help": "It\"s okay, don\"t be shy:)"
                        },
                        {
                              "component": "CheckboxField",
                              "checkboxes": [
                                    {
                                          "label": "I\"m already checked!",
                                          "defaultChecked": true,
                                          "key": 0
                                    },
                                    {
                                          "label": "Here\"s another",
                                          "key": 10
                                    }
                              ]
                        }
                  ]
            }
      ]
}
```

Example JS literal (ES6)
```js
...
  const welcomeSchema = {
  component: "h2",
  className: "text-center",
  text: "Welcome to Schema driven React Development!"
};

export default welcomeSchema;

...
```

##### Dynamic Children and Keys

When arrays of components exist (like children), react-schema-views will resolve a key for the element, which follows the rules for [dynamic children](https://facebook.github.io/react/docs/multiple-components.html#dynamic-children). It will either use a custom key if defined, or resolve a numeric key based on the array index.

Example of defining child keys (ES6)
```js
...
  {
    "component": "Comment",
    "key": "0ab19f8e", // defined key
    "author": "Sireesh Pangaluri",
    "children": "This is one comment"
  },
...
```

#### Component Mapping

React components need to be exposed to the react-schema-views so that the parser can create React elements. If the schema contains object literals with component references, the schema is exposing the React components and no additional configuration is needed. If the schema does not contain references to components, the components can be exposed via `setComponentMap`.

Example for exposing non-exposed components (ES6)
```js
/* es6 object literal shorthand: { ContactForm } == { ContactForm: ContactForm } */
contactForm.setComponentMap({ ContactForm, StringField });
```

#### Parsing

Use `parseSchema` to render React elements. It returns the root node. Note that if your schema's root is an array, you'll have to wrap the schema in an element.

Example (ES6)
```js
ReactDOM.render(contactForm.parseSchema(schema),
  document.getElementById('contact-form'));
```

##### Rendering

Since react-schema-views does not perform any rendering, the method in which you want to render is up to you. For example, you can use ReactDOMServer.render, ReactDOM.renderToString, etc. if you'd like.

#### Complete Example

```js
import React, { Component } from "react";
import "./App.css";
import ContactForm from "./Components/ContactForm";
import StringField from "./Components/StringField";
import CheckboxField from "./Components/CheckboxField";
import welcomeSchema from "./schemas/welcomeSchema";
import contactFormSchema from "./schemas/contactFormSchema.json";

import ReactSchemaViews from "react-schema-views";

class App extends Component {
  renderWelcomeSchema() {
    const welcomeBanner = new ReactSchemaViews();
    return welcomeBanner.parseSchema(welcomeSchema);
  }

  renderContactFormSchema() {
    const componentMap = { ContactForm, StringField, CheckboxField };
    const contactForm = new ReactSchemaViews();
    contactForm.setComponentMap(componentMap);
    return contactForm.parseSchema(contactFormSchema);
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          {this.renderWelcomeSchema()}
        </div>
        <div className="App-intro">
          {this.renderContactFormSchema()}
        </div>
      </div>
    );
  }
}

export default App;

```

### Try the Demo

To run the demo
* `npm install`
* `npm start`
* The app will be served at http://localhost:3000
