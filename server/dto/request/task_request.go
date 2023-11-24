package request

import "github.com/google/uuid"

type AssignToMeRequest struct {
	TaskID uuid.UUID `json:"task_id"`
}

type FinishTask struct {
	TaskID uuid.UUID `json:"task_id"`
}
