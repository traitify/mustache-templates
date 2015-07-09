# widget-tags

You must have npm installed to compile these tags.

### Usage
#### Initialize and Load With Options Hash
    Traitify.ui.init({assessmentId: "your assessment id", publicKey: "your public key"}).load()
#### Initialize and Load With Init Object 
    widgets = Traitify.ui.init()
    widgets.assessmentId = "your assessment id"
    widgets.publicKey = "your public key"
    widgets.load()

### Features

#### Event Handlers Include

    slideDeck.initialized
    slideDeck.me
    slideDeck.notMe
    slideDeck.finished
    
    personalityBlend.initialized
    
    personalityTypes.initialized
    personalityTypes.selectType
    
    personalityTraits.initialized
    
    famousPeople.initialized
    
    careers.initialized
    
#### Options
    assessmentId
    slideDeck.progressBarColor = #aaa
    
    
## Building
    npm install
    gulp
