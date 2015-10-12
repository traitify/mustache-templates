Traitify.ui = {
  deviceType: (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? "Phone" : "desktop"),
  widgets: Object(),
  widget: function(name, args) {
    return this.widgets[name] = args;
  },
  init: function(opts) {
    var widgets = Traitify.ui.widgets;
    var widgetNames = Object.keys(Traitify.ui.widgets);
    options = Object();
    for(i=0; i < widgetNames.length; i++){
      widget = widgets[widgetNames[i]];
      options[widget.name] = widget;
    }
    Object.keys(opts).forEach(function(option){
      if(typeof option == "string"){
        options[option] = opts[option];
      }else{
        options[option] = opts[option];
      }
    })
    this.Observable(options);

    if(opts.publicKey){
      Traitify.setPublicKey(opts.publicKey);
    }
    options.on("slideDeck.finish", function(){
      options.render();
    })
    options.render = function(){
      options.datas = Object();
      widgetNames.forEach(function(widgetName){
        widget = widgets[widgetName];
        widget.data.forEach(function(data){
          options.datas[data] = null;
        })
      })
      var scopes = Object.keys(options.datas).join(",");
      Traitify.get("/assessments/"+options.assessmentId+"?image_pack=linear&data="+ scopes).then(function(assessment){
        widgetNames.forEach(function(widgetName){
          widget = options[widgetName];
          widget.mount = document.querySelector(widget.target);
          widget.mount.innerHTML = "";
          var widgetAssessmentDatas = widget.data.filter(function(data){
            return assessment[data];
          })


          if(widgetAssessmentDatas.length == widget.data.length){
            assessment.raw = JSON.stringify(assessment);
            view = Mustache.render(widget.template, assessment);
            widget.mount.innerHTML = view;
            widget.scripts.forEach(function(innerScript){ 
              script = document.createElement("script");
              script.text = innerScript;
              widget.mount.appendChild(script);
            });
            widget.mount.traitify.options = options;

            widget.data.forEach(function(dataName){
              if(!widget.mount.traitify.data){
                widget.mount.traitify.data = Object();
              }
              widget.mount.traitify.data[dataName] = assessment[dataName];
            })
            widget.mount.traitify.assessmentId = assessment.id;
            widget.mount.traitify.initialize();
          }
        })
      })
      
    }
    
    return options;
  },
  Observable: function(options) {
    options.observable = {
      events: Array()
    };
    options.on = function(key, callback) {
      options.observable.events.push({
        name: key,
        callback: callback
      });
      return options;
    };
    options.trigger = function(keys, args) {
      var keys = keys.split(" ");
      var results = [];
      for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        var matcher = new RegExp(key.replace(/\s/g, "|"));
        var events = options.observable.events.filter(function(e) {
          return matcher.test(e.name);
        });
        results.push((function() {
          var results1 = [];
          for (j = 0; j < events.length; j++) {
            var onEvent = events[j];
            results1.push(onEvent.callback(args));
          }
          return results1;
        })());
      }
      return results;
    };
    return options;
  }
};
