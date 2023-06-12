<template>
  <div>
    <quill-editor
    v-model="editorOption.content"
    ref="myQuillEditor"
    :options="editorOption"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @change="onEditorChange($event)"
    @ready="onEditorReady($event)">
</quill-editor>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  data () {
    return {
        
editorOption: {
    content: "请在这里输入",
              modules:{
                toolbar:[
                          ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
                          ['blockquote', 'code-block'],     //引用，代码块
                          [{ 'header': 1 }, { 'header': 2 }],        // 标题，键值对的形式；1、2表示字体大小
                          [{ 'list': 'ordered'}, { 'list': 'bullet' }],     //列表
                          [{ 'script': 'sub'}, { 'script': 'super' }],   // 上下标
                          [{ 'indent': '-1'}, { 'indent': '+1' }],     // 缩进
                          [{ 'direction': 'rtl' }],             // 文本方向
                          [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
                          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题
                          [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
                          [{ 'font': [] }],     //字体
                          [{ 'align': [] }],    //对齐方式
                          ['clean'],    //清除字体样式
                          ['image','video']    //上传图片、上传视频
                          ]
                      }
                }
    }
  },
  components: {
    quillEditor
  },
  mounted() {

  },
  methods: {
    onEditorBlur(quill) {
    console.log('editor blur!', quill)
  },
// 获得焦点事件
  onEditorFocus(quill) {
    console.log('editor focus!', quill)
  },
// 准备富文本编辑器
  onEditorReady(quill) {
    console.log('editor ready!', quill)
  },
// 内容改变事件
  onEditorChange({ quill, html, text }) {
    console.log('editor change!', quill, html, text)
    this.content = html
  },
  },
}

</script>
<style scoped>
    .quill-editor{
        width: 100%;
        height: 300px;
        padding:  0 35px;
    }
</style>