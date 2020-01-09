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
                            <el-button @click="update(scope)" type="text" size="medium">Edit</el-button>
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
                        <el-button @click="onSubmit">
                            Post!
                        </el-button>
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
            activeName: 'write',
            categories: '',
            PostForm: {
                title: '',
                date: '',
                content: ''
            },
            postsList: [{
                date: "2019-12-11",
                title: "what a wonderful world",
                beginning: "what a wonderful world..."
            },{
                date: "2019-12-11",
                title: "what a wonderful world",
                beginning: "what a wonderful world..."
            },{
                date: "2019-12-11",
                title: "what a wonderful world",
                beginning: "what a wonderful world..."
            },{
                date: "2019-12-11",
                title: "what a wonderful world",
                beginning: "what a wonderful world..."
            },{
                date: "2019-12-11",
                title: "what a wonderful world",
                beginning: "what a wonderful world..."
            },{
                date: "2019-12-11",
                title: "what a wonderful world",
                beginning: "what a wonderful world..."
            },{
                date: "2019-12-11",
                title: "what a wonderful world",
                beginning: "what a wonderful world..."
            },{
                date: "2019-12-11",
                title: "what a wonderful world",
                beginning: "what a wonderful world..."
            },{
                date: "2019-12-11",
                title: "what a wonderful world",
                beginning: "what a wonderful world..."
            },{
                date: "2019-12-11",
                title: "what a wonderful world",
                beginning: "what a wonderful world..."
            },{
                date: "2019-12-11",
                title: "what a wonderful world",
                beginning: "what a wonderful world..."
            },{
                date: "2019-12-11",
                title: "what a wonderful world",
                beginning: "what a wonderful world..."
            },{
                date: "2019-12-11",
                title: "what a wonderful world",
                beginning: "what a wonderful world..."
            },{
                date: "2019-12-11",
                title: "what a wonderful world",
                beginning: "what a wonderful world..."
            },{
                date: "2019-12-11",
                title: "what a wonderful world",
                beginning: "what a wonderful world..."
            },{
                date: "2019-12-11",
                title: "what a wonderful world",
                beginning: "what a wonderful world..."
            },{
                date: "2019-12-19",
                title: "what a wonderful world",
                beginning: "what a wonderful world..."
            }],
            postUrl: '/api/post'
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
        update(row) {
            console.log(row)
        },
        onSubmit() {
            //console.log(this.PostForm)
            var raw_content = "---\n"
            raw_content += "title: " + this.PostForm.title + "\ncategories:\n"
            for (var cate of this.cate_tags) {
                raw_content += "- " + cate + "\n"
            }
            raw_content += "feature_image: \"https://picsum.photos/2560/600?image=872\"\n---\n"
            raw_content += this.PostForm.content

            this.PostForm.title = this.PostForm.title.replace(/\s+/g, '-');
            //console.log(this.PostForm.title)
            var file_name = this.PostForm.date+'-'+this.PostForm.title+".md"

            var postObj = {
                file_name: file_name,
                content: raw_content
            }

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
        }
    }
}
</script>