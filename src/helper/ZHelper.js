/**
 * @providesModule ZHelper
 */

var Helper = {
  createParam(data) {
      if (typeof(data)=='object') {
          var url = Object.keys(data).map((k)=> {
              if (typeof(data[k])=='object') {
                  return data[k].map(function(v1, k1){
                      return k+'['+k1+']='+encodeURIComponent(v1);
                  }).join('&');
              } else {
                  return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
              }
          }).join('&');
          return url;
      } else {
          var url = data.map((v, k)=> {
              return encodeURIComponent(k) + '=' + encodeURIComponent(v)
          }).join('&');
          return url;
      }
  }
};
module.exports = Helper;
