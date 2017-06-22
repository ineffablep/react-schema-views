import React, { Component } from "react";
import "./App.css";
import ContactForm from "./Components/ContactForm";
import StringField from "./Components/StringField";
import CheckboxField from "./Components/CheckboxField";
import welcomeSchema from "./schemas/welcomeSchema";
import contactFormSchema from "./schemas/contactFormSchema.json";

// If a package dependency: import ReactJsonSchema from 'react-schema-views';
import ReactSchemaView from "../lib/ReactSchemaViews";

class App extends Component {
  renderWelcomeSchema() {
    const welcomeBanner = new ReactSchemaView();
    return welcomeBanner.parseSchema(welcomeSchema);
  }

  renderContactFormSchema() {
    const componentMap = { ContactForm, StringField, CheckboxField };
    const contactForm = new ReactSchemaView();
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
