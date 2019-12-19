<template>
    <el-card shadow="always">
        <el-tabs v-model="activeName">
            <el-tab-pane label="write" name="write">
                <el-form ref="CreatePost" :model="PostForm" label-position="top" label-width="80px">
                    <el-form-item label="Title">
                        <el-input v-model="PostForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="categories">
                        <el-input v-model="PostForm.categories" placeholder="seprate with comma"></el-input>
                    </el-form-item>
                    <el-form-item label="Date">
                        <el-date-picker type="date" placeholder="pick the date" v-model="PostForm.date"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <mavon-editor v-model="PostForm.content"/>
                    </el-form-item>
                    <el-form-item style="text-align: center;">
                        <el-button>
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
            PostForm: {
                title: '',
                date: '',
                content: ''
            }
        }
    }
}
</script>