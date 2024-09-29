<script>
    $(document).ready(function () {
        tinymce.init({
            selector: '#description', 
            plugins: 'lists link image',
            toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image',
            height: 300 // Adjust height as needed
        });
    });
</script>