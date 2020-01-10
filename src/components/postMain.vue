<template>
    <el-card shadow="always">
        <el-tabs v-model="activeName">
            <el-tab-pane label="update" name="update">
                <el-table
                    :data="postsList"
                    style="width: 100%"
                    height="70vh">
                    <el-table-column
                        prop="date"
                        label="Date"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="title"
                        label="Title"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="beginning"
                        label="Beginning">
                    </el-table-column>
                    <el-table-column label="operation" width="100">
                        <template slot-scope="scope">
                            <el-button @click="update(scope)" type="text" size="medium" :loading="activeBtn == scope.$index">Edit</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="write" name="write">
                <el-form ref="CreatePost" :model="PostForm" label-position="top" label-width="80px">
                    <el-form-item label="Title" prop="title">
                        <el-input v-model="PostForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="categories" prop="categories">
                        <el-input v-model="categories" placeholder="seprate with comma"></el-input>
                    </el-form-item>
                    <el-form-item id="categories_tag" prop="tags">
                        <el-tag style="margin-left:10px;" v-for="item in cate_tags" v-bind:key="item">
                            {{item}}
                        </el-tag>
                    </el-form-item>
                    <el-form-item label="Date" prop="date">
                        <el-date-picker type="date" placeholder="pick the date" v-model="PostForm.date" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <mavon-editor v-model="PostForm.content"/>
                    </el-form-item>
                    <el-form-item style="text-align: center;">
                        <div v-if="!isUpdate">
                            <el-button @click="onSubmit" :loading="postLoading">
                                Post!
                            </el-button>
                        </div>
                        <div v-else>
                            <el-button @click="onUpdate" :loading="postLoading">
                                Update!
                            </el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="upload" name="upload">Upload</el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script>
export default {
    name: 'PostMain',
    data() {
        return {
            activeBtn: -1,
            activeName: 'update',
            categories: '',
            isUpdate: false,
            postLoading: false,
            PostForm: {
                title: '',
                date: '',
                content: ''
            },
            postsList: [],
            postUrl: '/api/post',
            listApi: '/api/post/list'
        }
    }, 
    computed: {
        cate_tags: function() {
            var l = this.categories.split(",")
            l = l.map(s => s.trim())
            l = l.filter(s => s !=="")
            return [...new Set(l)]
        }
    },
    methods: {
        listLoading() {
            this.axios.get(this.listApi).then((resp) => {
                var data = resp.data
                if(data.code) {
                    this.$notify({
                        title: "result",
                        message: data.message,
                        type: "error"
                    })
                } else {
                    this.postsList = data.data
                }
            }).catch((err)=>{
                this.$notify({
                    title:"loading error",
                    message: "error",
                    type: "error"
                })
                console.log(err)
            })
        },
        constructFileName(date, title){
            title = title.replace(/\s+/g, '-')
            return date + '-' + title + '.md'
        },

        constructPostObj(){
            var raw_content = "---\n"
            raw_content += "title: " + this.PostForm.title + "\ncategories:\n"
            for (var cate of this.cate_tags) {
                raw_content += "- " + cate + "\n"
            }
            raw_content += "feature_image: \"https://picsum.photos/2560/600?image=872\"\n---\n"
            raw_content += this.PostForm.content

            var file_name = this.constructFileName(this.PostForm.date, this.PostForm.title)
            return  {
                file_name: file_name,
                content: raw_content
            }
        },
        update(scope) {
            this.activeBtn = scope.$index
            var postContent = ""
            var filename = this.constructFileName(scope.row.date, scope.row.title)
            this.axios.get(this.postUrl, {params:{filename: filename}}).then((resp)=>{
                var data = resp.data
                if (data.code) {
                    this.$notify({
                        title: "result",
                        message: data.message,
                        type: "error"
                    })
                }else {
                    postContent = data.content
                    this.activeName = "write"
                    this.PostForm.title = scope.row.title
                    this.PostForm.date = scope.row.date
                    var l = postContent.split("---")
                    console.log(l)
                    this.PostForm.content = l[2].substring(1, l[2].length)
                    l = l[1].replace(/(?:\r\n|\r|\n)/g, ':').split(':')
                    l = l.map(s => s.trim())
                    l = l.filter(s => s !=="")
                    l = [...new Set(l)]
                    for (var i = 0; i < l.length; i++){
                        if (l[i] !== "categories"){
                            continue
                        }

                        for (i=i+1; i < l.length; i++){
                            if (l[i] !== "feature_image")
                                this.categories += l[i].substring(1, l[i].length)+","
                            else 
                                break
                        }
                        this.categories = this.categories.substring(0, this.categories.length-1)
                        break
                    }
                    this.isUpdate = true
                    this.activeBtn = -1
                }
            }).catch((err) => {
                this.$notify({
                    title:"post error",
                    message: "error",
                    type: "error"
                })
                console.log(err)
            })
        },
        onUpdate() {
            this.postLoading = true
            var postObj = this.constructPostObj()
            this.axios.patch(this.postUrl, postObj).then((resp) => {
                var data = resp.data
                if (data.code) {
                    this.$notify({
                        title: "result",
                        message: data.message,
                        type: "error"
                    })
                } else {
                    this.$notify({
                        title: "result",
                        message: "operation succeeded",
                        type: "success"
                    })
                    this.$refs.CreatePost.resetFields()
                    this.PostForm.content = ""
                    this.categories = ''
                    this.isUpdate = false
                }
            }).catch((err) => {
                this.$notify({
                    title:"update error",
                    message: "error",
                    type: "error"
                })
                console.log(err)
            })

            this.postLoading = false
        },
        onSubmit() {
            //console.log(this.PostForm
            var postObj = this.constructPostObj()
            this.postLoading = true
            this.axios.post(this.postUrl, postObj).then((resp) => {
                var data = resp.data
                if (data.code) {
                    this.$notify({
                        title: "result",
                        message: data.message,
                        type: "error"
                    })
                } else {
                    this.$notify({
                        title: "result",
                        message: "operation succeeded",
                        type: "success"
                    })
                    this.$refs.CreatePost.resetFields()
                    this.PostForm.content = ""
                    this.categories = ''
                }
            }).catch((err) => {
                this.$notify({
                    title:"post error",
                    message: "error",
                    type: "error"
                })
                console.log(err)
            })

            this.postLoading = false
        }
    },
    created() {
        this.listLoading()
    }
}
</script>