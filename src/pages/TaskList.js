import React from "react";
import Tasks from "../components/Tasks";
import Calendar from "../components/Calendar";

const TaskList = () => (
  <div>
    <h2> Список заданий </h2>
    <div className="row">
      <div className="col-12 tasks-list">
        <Tasks />
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

export default TaskList;
