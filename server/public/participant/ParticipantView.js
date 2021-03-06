define([ 
    "backbone",
    "handlebars", 
    "participant/Participant",
    "libs/Utils"
], function(
    Backbone,
    Handlebars, 
    Participant
) {
  var ParticipantView = Backbone.View.extend(
  /** @lends ParticipantView.prototype */
  {
    /**
     * @class This is the participant view controller  
     * 
     * @description Starts the ParticipantView and initializes all its children's views.
     * 
     * @property {String} format May be set when the ParticipantView is
     * initialized. Valid values are "new" "glimpse" "maskedDetails" confidentialDetails"
     * 
     * @extends Backbone.View
     * @constructs
     */
    initialize : function() {

      Utils.debug("PARTICIPANT VIEW init: " );
      this.changeViewsOfInternalModels();
    },
    events : {
      "click .create_new_participant_button" : "create_new_participant"
    },
    
    /**
     * The underlying model of the ParticipantView is a Participant.
     */    
    model : Participant,

    /**
     * The Handlebars template rendered if the caller asks for a new participant view
     */
    templateNew : Handlebars.templates.participant_new,
    
    /**
     * The Handlebars template rendered if the caller asks for a glimpse of the participant (usually an participant code)
     */
    templateGlimpse : Handlebars.templates.participant_glimpse,
    
    /**
     * The Handlebars template rendered if the caller asks for masked details of a participant (usually only a code and test date)
     */
    templateMaskedDetails : Handlebars.templates.participant_details_masked,
    
    /**
     * The Handlebars template rendered if the caller asks for all details of a participant (this shows all the confidential details)
     */
    templateConfidentialDetails : Handlebars.templates.participant_details_including_confidential,
    
    /**
     * Renders the ParticipantView and all of its child Views.
     */
    render : function() {
      Utils.debug("PARTICIPANT VIEW render: ");
      this.destroy_view();

      if (this.format == "new") {
        Utils.debug("PARTICIPANT VIEW NEW render: ");

        this.setElement($("#new_participant"));
        $(this.el).html(this.templateNew(this.model.toJSON()));

      } else if (this.format == "glimpse") {
        Utils.debug("PARTICIPANT VIEW GLIMPSE render: ");

        this.setElement($(".participant_glimpse"));
        $(this.el).html(this.templateGlimpse(this.model.toJSON()));

      }
      return this;
    },
    changeViewsOfInternalModels : function(){
      
    },
    create_new_participant : function(){
      Utils.debug("Creating a new participant.");
      this.model.set("participantCode", $(this.el).find(".participant_code").val() );
      this.model.set("experimenterCode", $(this.el).find(".experimenter_code").val() );
      this.model.set("startTime", Date.now() );

      $('#new_participant').modal("hide");
      window.experiment.router.showExperiment("0");
    }
  });
  return ParticipantView;
});