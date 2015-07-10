# Traitify Widgets (Riot Tags)
## Definition of Terms
A widget is anything graphical element that is self contained, a widget builder is a library for that supports the self contained library (widget), and a slider is a deck of slides that is displayed in the user interface to gather personality information. By clicking me or not me per slide (Image with caption), the user is able to give the api feedback on particular elements of personality that traitify's psychology team has deamed valuable.

### Usage
#### Simple Usage Instructions 
```html
<div class="tf-slide-deck"></div>
<div class="tf-personality-blend"></div>
<div class="tf-personality-types"></div>
<div class="tf-personality-traits"></div>
<div class="tf-careers"></div>
<script>
    widgets = Traitify.ui.init()
    widgets.assessmentId = "your assessment Id"
    widgets.publicKey = "your public key"
    widgets.load()
</script>
```

#### Initialize and Load With Options Hash
```javascript
Traitify.ui.init({assessmentId: "your assessment id", publicKey: "your public key"}).load()
```
#### Initialize and Load With Init Object 
```javascript
widgets = Traitify.ui.init()
widgets.assessmentId = "your assessment id"
widgets.publicKey = "your public key"
widgets.load()
```

### Features

#### Event Handlers Include
Notice that Event Handlers Can Be Chained
```javascript
widgets.on("slideDeck.initialized", function(){
    alert("Slide Deck Initialized")
}).on("slideDeck.me", function(){
    alert("Me Clicked")
}).on("slideDeck.notMe", function(){
    alert("Not Me Clicked")
}).on("slideDeck.finished", function(){
    alert("Slide Deck Finished")
})
    
widgets.on("personalityBlend.initialized", function(){
    alert("Personality Blend Initialized")
}).on("personalityTypes.initialized", function(){
    alert("Personality Types Initialized")
})
	
widgets.on("personalityTypes.typeSelected", function(widget){
    alert("Personality Type Selected " + widget.currentType)
})
	
widgets.on("personalityTraits.initialized", function(){
    alert("Personality Traits Initialized")
})
	
widgets.on("famousPeople.initialized", function(){
    alert("Famous People Initialized")
})
	
widgets.on("careers.initialized", function(){
    alert("Careers Initialized")
})
```
#### Listen to Two Separate Events Using the Same On Function 
```javascript
widgets.on("careers.initialized slideDeck.me").on(function(){
    alert("Careers Initialized or Slide Deck Me Click")
})
    
```
### Theming
#### Progress Bar Above Me Not Me Buttons
```css
.tf-me-not-me{
	border-radius: 0px;
}
.tf-progress-and-caption .tf-progress-bar{
	display: none;
}
.tf-response .tf-progress-bar{
	width: 320px;
	display: inline-block;
	margin: 0px auto;
	position: absolute;
}
.tf-response .tf-me-not-me{
	display:inline-block;
}
.tf-response .tf-progress-bar-inner{
	border-radius: 0px;
}

.tf-response .tf-progress-bar{
	margin-top: -10px;
}
```
#### Progress Bar Below Me Not Me Buttons
```css
.tf-me-not-me{
	border-radius: 0px;
}
.tf-progress-and-caption .tf-progress-bar{
	display: none;
}
.tf-response .tf-progress-bar{
	width: 320px;
	display: inline-block;
	margin: 0px auto;
	position: absolute;
}
.tf-response .tf-me-not-me{
	display:inline-block;
}
.tf-response .tf-progress-bar-inner{
	border-radius: 0px;
}
.tf-response .tf-progress-bar{
	margin-top: 36px;
}
.tf-response .tf-me-not-me{
	margin-top: -10px;
}
.tf-response{
	bottom: 40px;
}
```
#### Progress Bar Vertical
```css
.tf-me-not-me{
	border-radius: 0px;
}
.tf-progress-and-caption .tf-progress-bar{
	display: none;
}
.tf-progress-bar.tf-vertical{
	display: inline-block;
}
```
#### Progress Bar In Caption
```css
.tf-progress-bar{
	height: 100%;
	padding: 0px;
	width: 100%;
}
.tf-progress-bar-inner{
	position: absolute;
	background-color: rgba(39,235,95, .8);
	height: 100%;
	width: 0%;
	-webkit-transition: width .4s ease-in-out;
	-moz-transition: width .4s ease-in-out;
	-o-transition: width .4s ease-in-out;
	transition: width .4s ease-in-out;
	border-radius: 0px;
}
.tf-progress-and-caption{
	margin: 15px auto;
	max-width: 450px;
	width: 90%;
	background-color: rgba(15,84,34, .8);
	border-radius: 28px;
	overflow: hidden;
	position: relative;
}
.tf-caption{
	background-color: transparent;
}
```
#### Change Progress Bar Color Via CSS
```css
.tf-progress-bar-inner{
	background-color: #000;
}
```
#### Change Progress Bar Color Via Javascript
```javascript
Traitify.ui.init({
	assessmentId: "Your Assessment Id",
	publicKey: "My Public Key",
    slideDeck: {progressBarColor: "#aaa"}
}).load()
```

## Building
    npm install
    gulp
