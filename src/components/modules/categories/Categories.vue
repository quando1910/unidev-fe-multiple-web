<template>
  <section class="content">
    <custom-tab>
      <div class="row">
        <div class="col-md-3" v-if="shows"  v-for="(item, index) of handleCat" :key="index">
          <router-link :to="{ path: item.title}" append>
            <div :class="`box ${item.color} bg`">
              <div :class="`box-header  ${item.color} bg`">
                <div class="pull-right text-white box-tools"> <span class="text-white box-btn"><i class="circle-nest-medium ti-user"></i>
                  </span>&nbsp;&nbsp;&nbsp; </div>
                <h3 class="box-title">
                  <span class="text-white">&nbsp;&nbsp;&nbsp;{{$t(`lang['${item.title}'].default`)}}</span>
                </h3> 
              </div>
              <div class="box-body no-pad" style="display: block;">
                <div class="events-nest ">
                  <div class="wrap-no-pad text-white">
                    <bars :data="[1, 2, 5, 9, 5, 10, 3, 5, 2, 5, 1, 8, 2, 9, 0]" :gradient="['#ffffff', '#ffffff']"></bars>
                    <h1 class="text-white"><strong><animate-number from="1" :to="item.to"  duration="9000" easing="easeOutQuad" :formatter="formatter"></animate-number></strong></h1> 
                    <span>{{$t(`lang['${item.title}'].default`)}}</span>
                    <p>{{item.quantity}}</p>
                    <br> 
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </custom-tab>
  </section>
</template>

<script>
export default {
  name: 'Videos',
  data () {
    return {
      category: null,
      shows: false,
      handleCat: [
        {
          keyword: 'Picture',
          color: 'palette-Pink-300',
          title: 'pictures',
          to: 0,
          quantity: 0
        },
        {
          keyword: 'Article',
          color: 'palette-Cyan-400',
          title: 'articles',
          to: 0,
          quantity: 0
        },
        {
          keyword: 'Album',
          color: 'palette-Deep-Purple-300',
          title: 'albums',
          to: 0,
          quantity: 0
        },
        {
          keyword: 'Video',
          color: 'palette-Indigo-900',
          title: 'videos',
          to: 0,
          quantity: 0
        }
      ]
    }
  },
  created () {
    this.$http.get('api/categories/all')
      .then(response => {
        this.category = response.body
        this.handleCat.forEach(element => {
          element.to = this.category[`${element.title}Cat`].length
        })
        this.shows = true
      })
  }
}
</script>