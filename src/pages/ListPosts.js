import React from "react";
import Posts from "../components/Posts";
import Calendar from "../components/Calendar";

const ListPosts = () => (
  <div>
    <h2> Lists posts </h2>
    <div className="row">
      <div className="col-6">
        <Posts />
      </div>
      <div className="col-6">
        <Calendar />
      </div>
    </div>
    {/* Modal  <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".sel-modal">Large modal</button>

            <div class="modal fade sel-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  ...
                </div>
              </div>
            </div> */}
  </div>
);

export default ListPosts;
