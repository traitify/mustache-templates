riot.tag('bundler-form', '<form action="{this.url}" method="GET" onsubmit="{this.handleSubmit}"> <h2> <input type="checkbox" id="blend" value="{this.values.blend}" onclick="{ this.toggle }"> <label for="blend">Blends?</label> </h2> <tf-blend assessment-id="01d331f2-0686-4465-a065-03c9852107b8"> </tf-blend> <br > <h2> <input type="checkbox" id="types" value="{this.values.types}" onclick="{ this.toggle }"> <label for="types">Types?</label> </h2> <tf-types assessment-id="01d331f2-0686-4465-a065-03c9852107b8"> </tf-types> <br > <h2> <input type="checkbox" id="traits" value="{this.values.traits}" onclick="{ this.toggle }"> <label for="traits">Traits?</label> </h2> <tf-traits assessment-id="01d331f2-0686-4465-a065-03c9852107b8"> </tf-traits> <br > <input type="submit" value="Build!" class="btn btn-primary"> </form>', 'h2{ text-align: center; font-family: "Source Sans Pro"; } h2 input{ margin:0px auto; } .btn.btn-primary{ background-color: #3498db; color: #fff; margin: 0px auto; padding: 5px 10px; font-size: 20px; border: 0px; border-radius: 3px; } bundler-form form{ text-align:center; }', function(opts) {this.handleSubmit = function(e) {
  var keys, that;
  e.preventDefault();
  that = this;
  keys = Object.keys(this.values).filter(function(e) {
    return that.values[e] === true;
  });
  return location.href = "/bundle?packages=" + (keys.join(","));
};

this.values = Object();

this.toggle = function(e) {
  this.values[e.target.id] = e.target.checked;
  return true;
};

this.values.blend = false;

this.values.traits = false;

this.values.types = false;

this.update();

});