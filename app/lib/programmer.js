import Ember from 'ember';

export default Ember.Object.extend({
  // firstName: null,
  // lastName: null,
  // nickName: null,
  // age: null,
  // authorOf: null,
  // conferences: [],
  // don't need to define properties

  greet: function(){
    return `Hi, My name is ${this.firstName} ${this.lastName}. You can call me ${this.nickName}`;
  },

  isOld: Ember.computed.gte("age", 30),
  wroteRuby: Ember.computed.equal("authorOf", "Ruby"),

  addConference: function(conference){
    var conferences = this.get('conferences');
    conferences.pushObject(conference);
  },

  keyNoteConferences: Ember.computed('conferences.@each.keyNote', function() {
    var conferences = this.get('conferences');
    return conferences.filterBy('keyNote', this.firstName + ' ' + this.lastName);
  }),

  conferenceNames: Ember.computed.map('conferences', function(conference){
    return conference.name;
  }),

  conferenceTotal: Ember.computed('conferences.[]', function(){
    return this.get("conferences").length;
  }),

  itinerary: Ember.computed("nickName", "conferenceTotal",function(){
    // let num = this.conferences.length;
    return `${this.get('nickName')} is speaking at ${this.get('conferenceTotal')} conferences`;
  }),

  hasValidEmail: Ember.computed.match("email", /.*?@.*?/),
  hasFirstName: Ember.computed.notEmpty("firstName"),
  hasLastName: Ember.computed.notEmpty("lastName"),
  hasAge: Ember.computed.notEmpty("age"),
  isValid: Ember.computed.and("hasFirstName", "hasLastName", "hasAge", "hasValidEmail"),
  isInvalid: Ember.computed.not("isValid"),
  hasErrors: Ember.computed.notEmpty("errors"),
  
  errors: Ember.computed("hasAge", "hasFirstName", "hasLastName", "hasValidEmail", function(){
      let errors = [];
      //Figure out which errors to put in
      if(!this.get('hasAge')){
        errors.pushObject("age cannot be blank");
      }
      if(!this.get('hasFirstName')){
        errors.pushObject("firstName cannot be blank");
      }
      if(!this.get('hasLastName')){
        errors.pushObject("lastName cannot be blank");
      }
      if(!this.get('hasValidEmail')){
        errors.pushObject("email must be valid");
      }
      return errors;
  })
});



  // isOld: Ember.computed("age", function(){
  //   if (this.age > 30) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }),
  // wroteRuby: Ember.computed("nickName", function() {
  //   if (this.nickName === "Matz") {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // })

