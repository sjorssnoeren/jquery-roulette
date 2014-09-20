# jQuery roulette

### Installation

Copy *jroulette.min.js* to the destination of your project. Add jQuery to your project. Include jroulette as follows (in the `<head>` or `<body>`).

```
<script src="jroulette.min.js"></script>
```

### Usage

Intialize jroulette

```
$('#jroulette').jRoulette();
```

### Options

The following options are supported

```
$('#jroulette').jRoulette({
  duration: 3000,
  itemSelector: '.item',
  maxItems: 6,
  transitionClass: 'animated zoomInDown'
});
```