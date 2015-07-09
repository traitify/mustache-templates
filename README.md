# widget-tags

You must have npm installed to compile these tags.

### Usage
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
```javascript
	widgets.on("slideDeck.initialized", function(){
	  alert("Slide Deck Initialized")
	})
	widgets.on("slideDeck.me", function(){
	  alert("Me Clicked")
	})
	widgets.on("slideDeck.notMe", function(){
	  alert("Not Me Clicked")
	})
	widgets.on("slideDeck.finished", function(){
	  alert("Slide Deck Finished")
	})
    
	widgets.on("personalityBlend.initialized", function(){
	  alert("Personality Blend Initialized")
	})
    
    	widgets.on("personalityTypes.initialized", function(){
	  alert("Personality Types Initialized")
	})
	
	widgets.on("personalityTypes.typeSelected", function(widget){
	  alert("Personality Type Selected " + widget.personalityType)
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
#### Options
```javascript
    {
        assessmentId: "your assessment id",
        slideDeck: {progressBarColor: "#aaa"}
    }
```

## Building
    npm install
    gulp
