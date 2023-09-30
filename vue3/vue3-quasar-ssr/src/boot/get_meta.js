/**
 * 设置meta参数 (seo优化)
 * @param {*} title 
 * @param {*} desc 
 * @returns 
 */
export default function (title, desc) {
    return {
      title: {
        name: 'title',
        content: title
      },
      ogTitle: {
        property: 'og:title',
        content: title
      },
      twitterTitle: {
        name: 'twitter:title',
        content: title
      },
  
      description: {
        name: 'description',
        content: desc
      },
      ogDesc: {
        property: 'og:description',
        content: desc
      },
      twitterDesc: {
        name: 'twitter:description',
        content: desc
      }
    }
  }