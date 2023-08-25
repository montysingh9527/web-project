import Vue from "vue";
import VueRouter from "vue-router";

import routes from "./routes";

Vue.use(VueRouter);



/**
 * 
const metaInfo = {
  'Home': {
    title: 'Home Page',
    description: 'Welcome to our website!'
  },
  'About': {
    title: 'About Us',
    description: 'Learn more about our company.'
  },
  // ... add more routes as needed
};


router.beforeEach((to, from, next) => {
  const routeMeta = metaInfo[to.name];
  if (routeMeta) {
    document.title = routeMeta.title;
    const descriptionMetaTag = document.querySelector('meta[name="description"]');
    if (descriptionMetaTag) {
      descriptionMetaTag.setAttribute('content', routeMeta.description);
    }

    // const ogDescriptionMetaTag = document.querySelector('meta[property="og:description"]');
    // if (ogDescriptionMetaTag) {
    //   ogDescriptionMetaTag.setAttribute('content', routeMeta.ogDescription);
    // }
  }
  next();
});
 */

const router = new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes,
  // Leave these as they are and change in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
});

// router.beforeEach((to, from, next) => {
//   console.log("--router---", to, from);
//   if (to.meta.description) {
//     const descriptionMetaTag = document.querySelector(
//       'meta[name="description"]'
//     );
//     if (descriptionMetaTag) {
//       descriptionMetaTag.setAttribute("content", to.meta.description);
//     }
//   }
//   next();
// });


router.beforeEach((to, from, next) => {
  const routeMeta = to.meta;
  if (routeMeta) {
    // Update Open Graph title and description
    const ogTitleMetaTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleMetaTag) {
      ogTitleMetaTag.setAttribute('content', routeMeta.ogTitle);
    }
    const ogDescriptionMetaTag = document.querySelector('meta[property="og:description"]');
    if (ogDescriptionMetaTag) {
      ogDescriptionMetaTag.setAttribute('content', routeMeta.ogDescription);
    }
  }
  next();
});

export default router;
