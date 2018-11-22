export function getDefaultPath() {
   const getParent = lastRoute => {
       const parents = {
           ecommerce: ['shop', 'cart', 'checkout', 'card'],
           map: ['googlemap', 'leafletmap'],
           charts: [
               'googleChart',
               'reecharts',
               'reactVis',
               'reactChart2',
               'reactTrend',
               'echart'
           ],
           Forms: [
               'InputField',
               'editor',
               'FormsWithValidation',
               'progress',
               'button',
               'tab',
               'checkbox',
               'radiobox',
               'transfer',
               'autocomplete'
           ],
           uielements: [
               'op_badge',
               'op_card',
               'op_carousel',
               'op_collapse',
               'op_popover',
               'op_tooltip',
               'op_tag',
               'op_timeline',
               'dropdown',
               'pagination',
               'rating',
               'tree'
           ],
           advancedUielements: [
               'reactDates',
               'codeMirror',
               'uppy',
               'dropzone'
           ],
           feedback: [
               'alert',
               'modal',
               'message',
               'notification',
               'popconfirm',
               'spin'
           ],
           table: ['table_ant'],
           pages: [
               '404',
               '500',
               'signin',
               'signup',
               'forgotpassword',
               'resetpassword',
               'invoice',
               'comingSoon'
           ]
       };

       let parent;
       Object.keys(parents).forEach(key => {
           parents[key].forEach(p => {
               if (p === lastRoute) {
                   parent = key;
               }
           });
       });
       return parent ? [parent, lastRoute] : [lastRoute];
   };
   if (window && window.location.pathname) {
       const routes = window.location.pathname.split('/');
       if (routes.length > 1) {
           const lastRoute = routes[routes.length - 1];
           if (lastRoute) {
               return getParent(lastRoute);
           }
       }
   }
   return [];
}