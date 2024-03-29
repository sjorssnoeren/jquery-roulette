/**
 * jRoulette
 *
 * @author Sjors Snoeren
 * @version 0.1
 */
;(function($) {

  $.jRoulette = function(element, options) {

    /**
     * Plugin properties and such
     */
    var plugin = this;

    var defaults = {
      duration: 3000,
      itemClass: 'item',
      maxItems: 6,
      transitionInClass: 'animated fadeIn',
      transitionInDuration: 1100,
      transitionOutClass: 'animated fadeOut',
      transitionOutDuration: 1100
    };  
    
    plugin.settings = {};

    var element = element;

    /**
     * Initialize plugin
     */
    plugin.init = function() {
      plugin.settings = $.extend({}, defaults, options);

      var duration = plugin.settings.duration,
          transitionInDuration = plugin.settings.transitionInDuration,
          transitionOutDuration = plugin.settings.transitionOutDuration;

      if (transitionInDuration > duration || transitionOutDuration > duration) {
        jQuery.error('In & out transitions may not be shorter then shuffle duration \n' + 
                     'In:' + transitionInDuration + '\n' +
                     'Out:' + transitionOutDuration + '\n' +
                     'Duration:' + duration);
      }

      start();
    }

    /**
     * Starts the roulette process
     * Sets only max amount items to visible
     */
    var start = function() {
      var itemClass = plugin.settings.itemClass,
          maxItems = plugin.settings.maxItems,
          totalItems = $(element).find('.' + itemClass).size();

      plugin.settings.maxItems = totalItems < maxItems ? totalItems : maxItems;
      plugin.settings.totalItems = totalItems;

      $(element).find('.' + itemClass).hide();
      for (var i = 0; i < maxItems; i++) {
        $(element).find('.' + itemClass).eq(i).show();
      }

      window.setInterval(function () {
        roulette();
      }, plugin.settings.duration);
    }

    /**
     * Randomly selects a new image and inserts it
     * at a random existing index
     */
    var roulette = function() {
      var maxItems = plugin.settings.maxItems,
          totalItems = plugin.settings.totalItems,
          unusedItems = totalItems - maxItems;

      var insertIndex = random(maxItems),
          replaceIndex = random(unusedItems);
      
      if (totalItems > maxItems) {
        replaceIndex += maxItems;
      }

      switchDomElements(insertIndex, replaceIndex);
    }

    /**
     * Replace the contents of two DOM elements with each other
     *
     * @param int index of the first DOM element
     * @param int index of the second DOM element
     */
    var switchDomElements = function(insertIndex, replaceIndex) {
      var itemClass = plugin.settings.itemClass,
          transitionInClass = plugin.settings.transitionInClass,
          transitionInDuration = plugin.settings.transitionInDuration;
          transitionOutClass = plugin.settings.transitionOutClass,
          transitionOutDuration = plugin.settings.transitionOutDuration;

      var insert = $(element).find('.' + itemClass).eq(insertIndex).html(),
          replace = $(element).find('.' + itemClass).eq(replaceIndex).html();

      var insertObj = $(element).find('.' + itemClass).eq(insertIndex),
          replaceObj = $(element).find('.' + itemClass).eq(replaceIndex);

      insertObj.outerWidth();
      insertObj.addClass(transitionOutClass);

      setTimeout(function() {
        insertObj.removeClass(transitionOutClass);

        insertObj.html(replace);

        insertObj.outerWidth();
        insertObj.addClass(transitionInClass);

        replaceObj.html(insert);

        setTimeout(function () {
          insertObj.removeClass(transitionInClass);
        }, transitionInDuration);

      }, transitionOutDuration);
    }

    /**
     * Helpers function for random integers
     *
     * @param int maximum random output
     * @return int random integer
     */
    var random = function(max) {
      return Math.floor(Math.random() * max);
    }

    plugin.init();
  }


  /**
   * Prevents the creation multiple instances
   */
  $.fn.jRoulette = function(options) {

    return this.each(function() {
      if (undefined == $(this).data('jRoulette')) {
        var plugin = new $.jRoulette(this, options);
        $(this).data('jRoulette', plugin);
      }
    });
  }

})(jQuery);