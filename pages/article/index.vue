<template>
    <div class="content">
        <div
            v-for="(item,index) in list"
            :key="item.id"
            class="list-item"
            @click="smallClick(item)"
        >
            <div>
                <img :src='"img/article/"+Math.ceil(Math.random()*4)+".jpg" '/>
            </div>
            <div class="list-item-content">
                <h4 title="查看">
                    <span class="title" @click="goToArticle(item)">{{item.title}}</span>
                    <span class="time">
                        <span
                            class="deleteArticle"
                            v-if="$store.state.user.admin"
                        >
                            <el-popconfirm @onConfirm='deleteArticle(item)' title="这是一段内容确定删除吗？">
                                <span slot="reference" class="deleteArticle">DELETE</span>
                            </el-popconfirm>
                        </span>
                        {{getArticleTimes(item.gmtCreate)}}
                    </span>
                </h4>
                <p
                    class="abstracts"
                    :title="item.abstracts || item.remark.slice(0,80)"
                >{{item.abstracts || item.remark.slice(0,80)}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { get } from "~/axios/axios.js";
import { getArticleTime } from "~/util/index.js";
export default {
    async asyncData(context) {
        let x = await get(`/article/list_all?curPage=1&limit=5`);
        return { list: x.data.data };
    },
    components: {},
    data() {
        return {
            list: []
        };
    },
    methods: {
        async deleteArticle(item) {
            let res  = await this.$axios.post(`/article/delete/`+item.id);
            location.reload()
        },
        smallClick(item) {
            if (document.body.clientWidth < 900) {
                this.goToArticle(item);
            }
        },
        getArticleTimes(time) {
            return getArticleTime(time);
        },
        async getList() {
            // this.$axios.get('')
        },
        goToArticle(item) {
            this.$router.push({
                path: `/article/${item.id}`,
                params: { id: item.id }
            });
        }
    },
    mounted() {}
};
</script>
<style lang='less' scoped>
img {
    -webkit-user-drag: none;
}
.list-item {
    border-bottom: 1px solid rgba(220, 220, 220, 0.299);
    width: 60%;
    margin: 10px auto;
    display: flex;
    transition: all 0.8s;
    position: relative;
    align-items: center;
    &::after {
        content: "";
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 2px;
        background-color: red;
        bottom: 0;
        transition: all 0.3s;
    }
    &:hover {
        &::after {
            width: 100%;
        }
        .title {
            color: red;
        }
        .deleteArticle {
            opacity: 1 !important;
        }
    }
    img {
        object-fit: cover;
        padding: 10px;
        width: 80px;
        height: 80px;
        border-radius: 20px;
    }
    .list-item-content {
        height: 100px;
        h4 {
            margin: 5px 0;
        }
        .title {
            cursor: pointer;
            transition: all 0.3s;
        }
        .abstracts {
            position: absolute;
            bottom: 0;
            margin-top: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .time {
            position: absolute;
            right: 0;
            font-size: 0.7em;
            .deleteArticle {
                transition: all 0.3s;
                opacity: 0;
                display: inline-block;
                margin-right: 10px;
                padding: 0 5px;
                color: red;
                cursor: pointer;
            }
        }
    }
}
@media screen and (max-width: 900px) {
    .list-item {
        width: 90%;
    }
}
</style>