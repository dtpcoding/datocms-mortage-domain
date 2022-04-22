<template>
  <div>
    <section class="banner py-[150px]">
      <div class="container">
        <div class="flex items-center justify-center">
          <div class="text-center max-w-[500px]">
            <h2 v-if="homepage.banner[0].title" class="h1" v-html="homepage.banner[0].title"></h2>
            <h2 v-if="homepage.banner[0].titleSecondLine" class="h1 mb-6 text-secondary" v-html="homepage.banner[0].titleSecondLine"></h2>
            <p v-if="homepage.banner[0].tagline" class="mb-7 leading-[1.4] text-[20px] font-light" v-html="homepage.banner[0].tagline"></p>
            <button v-if="homepage.banner[0].buttonLabel" class="button button--primary" v-html="homepage.banner[0].buttonLabel"></button>
          </div>
        </div>
      </div>
    </section>

    <section class="brokerage-form">
    <form name="contact" method="POST" data-netlify="true">
      <input type="hidden" name="form-name" value="contact">
  <p>
    <label>Your Name: </label>
    <input type="text" name="name" />
  </p>
  <p>
    <label>Your Email: </label>
    <input type="email" name="email" />
  </p>
  <p>
    <label>Your Role: </label>
    <select name="role[]" multiple>
      <option value="leader">Leader</option>
      <option value="follower">Follower</option>
    </select>
  </p>
  <p>
    <label>Message: </label>
    <textarea name="message"></textarea>
  </p>
  <p>
    <button type="submit">Send</button>
  </p>
</form>
    </section>

    <!-- <section class="hero">
      <div class="hero-body">
        <div class="container">
          <div v-for="post in posts.slice(0, 2)" v-bind:key="post.slug">
            <div class="columns">
              <div class="column is-8 is-offset-2">
                <figure class="image">
                  <datocms-image :data="post.coverImage.responsiveImage" />
                </figure>
              </div>
            </div>

            <section class="section">
              <div class="columns">
                <div class="column is-8 is-offset-2">
                  <div class="content is-medium">
                    <h2 class="subtitle is-4">
                      {{ formatDate(post.publicationDate) }}
                    </h2>
                    <h1 class="title">
                      <nuxt-link :to="`/posts/${post.slug}`">{{
                        post.title
                      }}</nuxt-link>
                    </h1>
                    <div v-html="post.excerpt" />
                  </div>
                </div>
              </div>
            </section>

            <div class="is-divider" />
          </div>
        </div>
      </div>
    </section> -->

    <!-- newsletter -->
    <!-- <section class="section">
      <div class="columns">
        <div class="column is-10 is-offset-1">
          <div class="container has-text-centered is-fluid">
            <div class="hero is-light">
              <div class="hero-body">
                <h2 class="title is-4">Sign up for our newsletter</h2>
                <div class="column is-6 is-offset-3">
                  <div class="field has-addons has-addons-centered">
                    <div class="control is-expanded">
                      <input
                        class="input"
                        type="text"
                        placeholder="Email address"
                      />
                    </div>
                    <div class="control">
                      <a class="button is-info">
                        Subscribe
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Articles -->

    <!-- <section class="hero ">
      <div class="hero-body">
        <div class="container">
          <div
            v-for="group in Math.ceil((posts.length - 2) / 2)"
            v-bind:key="group"
          >
            <section class="section">
              <div class="columns is-variable is-8">
                <div
                  v-for="(post, index) in posts.slice(group * 2, group * 2 + 2)"
                  v-bind:key="post.slug"
                  :class="['column is-5', index === 0 && 'is-offset-1']"
                >
                  <div class="content is-medium">
                    <h2 class="subtitle is-5 has-text-grey">
                      {{ formatDate(post.publicationDate) }}
                    </h2>
                    <h1 class="title has-text-black is-3">
                      <nuxt-link :to="`/posts/${post.slug}`">{{
                        post.title
                      }}</nuxt-link>
                    </h1>
                    <div class="has-text-dark" v-html="post.excerpt" />
                  </div>
                </div>
              </div>
            </section>

            <div class="is-divider" />
          </div>
        </div>
      </div>
    </section> -->
  </div>
</template>

<script>
import { request, gql, imageFields, seoMetaTagsFields } from '~/lib/datocms'
import { toHead } from 'vue-datocms'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import axios from "axios";

export default {
  async asyncData({ params }) {
    const data = await request({
      query: gql`
        {
          site: _site {
            favicon: faviconMetaTags {
              ...seoMetaTagsFields
            }
          }

          posts: allPosts(first: 10, orderBy: _firstPublishedAt_DESC) {
            id
            title
            slug
            publicationDate: _firstPublishedAt
            excerpt
            coverImage {
              responsiveImage(imgixParams: { fit: crop, ar: "16:9", w: 860 }) {
                ...imageFields
              }
            }
            author {
              name
              picture {
                responsiveImage(imgixParams: { fit: crop, ar: "1:1", w: 40 }) {
                  ...imageFields
                }
              }
            }
          }

          homepage {
            _seoMetaTags {
              attributes
              content
              tag
            }
            banner {
              image {
                responsiveImage(imgixParams: { fit: fill, h: 300 }) {
                  ...imageFields
                }
              }
              tagline
              title
              titleSecondLine
              buttonLabel
            }
          }
        }
        ${imageFields}
        ${seoMetaTagsFields}
      `
    })

    return { ready: !!data, ...data }
  },
  data() {
    return {
      form: {
        firstname: "",
        lastname: "",
        email: "",
        subject: "",
        message: ""
      }
    }
  },
  methods: {
    formatDate(date) {
      return format(parseISO(date), 'PPP')
    },
    encode (data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    },
     handleSubmit(e) {
      const axiosConfig = {
        header: { "Content-Type": "application/x-www-form-urlencoded" }
      };

      axios.post("/", this.encode({
            "form-name": "brokerage-form",
            ...this.form
          }),
          axiosConfig
        ).then(() => this.$router.push("/#form-submitted"))
          .catch((error) => alert(error));;
      }


    //   fetch("/", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //     body: this.encode({
    //       "form-name": "brokerage-form",
    //       ...this.form
    //     })
    //   })
    //       .then(() => this.$router.push("/#form-submitted"))
    //       .catch((error) => alert(error));
    // }
  },
  head() {
    if (!this.ready) {
      return
    }

    return toHead(this.homepage._seoMetaTags, this.site.favicon)
  },
  mounted() {
    console.log(this.homepage.banner[0]);
  }
}
</script>
