import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const editorConfig = {
  placeholder: 'Nhập nội dung ở đây...',
  extraPlugins: [MyCustomUploadAdapterPlugin],
  image: {
    resizeUnit: 'px',
    resizeOptions: [
      {
        name: 'resizeImage:original',
        label: 'Gốc',
        value: null,
      },
      {
        name: 'resizeImage:50',
        label: '50%',
        value: '50',
      },
      {
        name: 'resizeImage:75',
        label: '75%',
        value: '75',
      },
    ],
    toolbar: [
      'imageTextAlternative',
      'imageStyle:alignLeft',
      'imageStyle:alignCenter',
      'imageStyle:alignRight',
      'resizeImage',
    ],
    styles: ['alignLeft', 'alignCenter', 'alignRight'],
  },
};

// Plugin thêm vào để hỗ trợ Base64
function MyCustomUploadAdapterPlugin(editor: ClassicEditor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return new Base64UploadAdapter(loader);
  };
}

// Tự viết Base64 adapter
class Base64UploadAdapter {
  private loader: any;

  constructor(loader: any) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then((file: File) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({ default: reader.result as string });
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    });
  }

  abort() {
    // Optional: xử lý khi người dùng hủy upload
  }
}
