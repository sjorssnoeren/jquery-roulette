# jQuery roulette

### About the plugin
jRoulette makes it possible for you to present stuff in a great (rouleting) way using css classes. We recommend you to use a css library like animate.css from Daniel Eden to get the best results.

Let's say you have an Instagram account and a website to show these Instagram photos on. You can only to showcase 5 photos because the container doesn't allow you to show more of your great pictures. jRoulette makes it possible for you to rotate these items so you can show more than the 5 pictures that you got room for.

A demo can be found over here: [https://sjorssnoeren.github.io/jquery-roulette](https://sjorssnoeren.github.io/jquery-roulette) 

### Installation

Copy *jroulette.min.js* to your js files folder but make sure you are are loading jQuery otherwise the plugin won't work. The file can be called from the `head` or before the `</body>` closing tag.

```
<script src="jroulette.min.js"></script>
```

### Default usage

```
$('#jroulette').jRoulette();
```

### Options

The following options are currently supported by the plugin, note that the options in this example are the default settings for the plugin.

```
$('#jroulette').jRoulette({
  duration: 3000,
  itemSelector: '.item',
  maxItems: 6,
  transitionClass: 'animated zoomInDown'
});
```