import Quill from 'quill'

// 编辑器图片处理插件配置, 如果不配置图片在编辑器改动的样式将不会保存到htmlContent中
var BaseImageFormat = Quill.import('formats/image');
const ImageFormatAttributesList = [
  'alt',
  'height',
  'width',
  'style'
];

export class ImageFormat extends BaseImageFormat {
  static formats(domNode) {
    return ImageFormatAttributesList.reduce(function(formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }
  format(name, value) {
    if (ImageFormatAttributesList.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}


// 富文本编辑工具栏
export const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
    ['emoji'],
  ["blockquote", "code-block"],
  [{
    header: 1
  }, {
    header: 2
  }],
  [{
    list: "ordered"
  }, {
    list: "bullet"
  }],
  [{
    script: "sub"
  }, {
    script: "super"
  }],
  [{
    indent: "-1"
  }, {
    indent: "+1"
  }],
  [{
    direction: "rtl"
  }],

  [{
    size: ["small", false, "large", "huge"]
  }],
  [{
    header: [1, 2, 3, 4, 5, 6, false]
  }],

  [{
    color: []
  }, {
    background: []
  }],
  [{
    align: []
  }],
  ["link", "image"],
  ["clean"]
];
