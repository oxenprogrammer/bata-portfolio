<!-- SMALL MODAL -->
<div id="addCategory" class="modal">
    <div class="modal-dialog modal-md" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h6 class="modal-title">Add Category </h6>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form id='categoryForm'>
              @csrf
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <label>Name</label>
                            <input class='form-control' name='name' id='name'>
                        </div>
                    </div>
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="submit" class="btn btn-indigo" id='categoryAdd'>Add</button>
                    <button type="button" class="btn btn-outline-light" data-dismiss="modal">Close</button>
                </div>
            </form>
        </div>
    </div><!-- modal-dialog -->
</div><!-- modal -->