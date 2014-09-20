/**
 * jRoulette
 *
 * @author Sjors Snoeren
 */
;(function($) {

  $.jRoulette = function(element, options) {

    var plugin = this;

    var defaults = {
      duration: 3000,
      itemSelector: '.item',
      maxItems: 6
    };  
    
    plugin.settings = {};

    var $element = $(element),
        element = element;

    /**
     * Initialize plugin
     */
    plugin.init = function() {
      plugin.settings = $.extend({}, defaults, options);
      start();
    }

    /**
     * Starts the roulette process
     * Sets only max amount items to visible
     */
    var start = function() {
      var itemSelector = plugin.settings.itemSelector,
          maxItems = plugin.settings.maxItems,
          totalItems = $(itemSelector).size();

      plugin.settings.maxItems = totalItems < maxItems ? totalItems : maxItems;
      plugin.settings.totalItems = totalItems;

      $(itemSelector).hide();
      for (var i = 0; i < maxItems; i++) {
        $(itemSelector).eq(i).show();
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

    var switchDomElements = function(insertIndex, replaceIndex) {
      var itemSelector = plugin.settings.itemSelector;

      var insert = $(itemSelector).eq(insertIndex).html(),
          replace = $(itemSelector).eq(replaceIndex).html();

      $(itemSelector).eq(insertIndex).html(replace).hide().fadeIn();
      $(itemSelector).eq(replaceIndex).html(insert);
    }

    var random = function(max) {
      return Math.floor(Math.random() * max);
    }

    plugin.init();
  }


  /**
   * Prevents multiple instances
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