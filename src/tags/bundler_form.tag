<bundler-form>
  <form action={this.url} method="GET" onsubmit={this.handleSubmit}>
    <h2>
      <input type="checkbox" id="tf-slide-deck" value={this.values.slide_deck} onclick={ this.toggle } />
      <label for="tf-slide-deck">Slide Deck?</label>
    </h2>
    <tf-slide-deck>
    </tf-slide-deck>
    <br />
    <h2>
      <input type="checkbox" id="blend" value={this.values.blend} onclick={ this.toggle } />
      <label for="blend">Blends?</label>
    </h2>
    <tf-blend results=true assessment-id="2ba49aa9-35a7-4f38-8e99-2523f2704a22">
    </tf-blend>
    <br />

    <h2>
      <input type="checkbox" id="types" value={this.values.types} onclick={ this.toggle } />
      <label for="types">Types?</label>
    </h2>
    <tf-types results=true assessment-id="2ba49aa9-35a7-4f38-8e99-2523f2704a22">
    </tf-types>
    <br />
    <h2>
      <input type="checkbox" id="traits" value={this.values.traits} onclick={ this.toggle } />
      <label for="traits">Traits?</label>
    </h2>
    <tf-traits results=true assessment-id="2ba49aa9-35a7-4f38-8e99-2523f2704a22">
    </tf-traits>
    <br />
    <input type="submit" value="Build!" class="btn btn-primary" />
  </form>
  <style>
    h2{
      margin-top: 48px;
      text-align: center;
      font-family: "Source Sans Pro";
    }
    h2 input{
      margin:0px auto;
    }
    .btn.btn-primary{
      background-color: #3498db;
      color: #fff;
      margin: 0px auto;
      padding: 5px 10px;
      font-size: 20px;
      border: 0px;
      border-radius: 3px;
    }
    bundler-form form{
      text-align:center;
    }
  </style>
  <script>
    this.handleSubmit = (e)->
      e.preventDefault()
      that = this
      keys = Object.keys(this.values).filter((e)->
        that.values[e] == true
      )
      location.href = "/bundle?packages=#{keys.join(",")}"
    this.values = Object()
    this.toggle = (e)->
      this.values[e.target.id] = e.target.checked
      return true

    this.values.blend = false
    this.values.traits = false
    this.values.types = false

    this.update()
  </script>
</bundler-form>
