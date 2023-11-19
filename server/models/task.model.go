package models

import (
	"github.com/google/uuid"
)

type Task struct {
	TaskID uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
	AssignedDriverID *uuid.UUID `gorm:"type:uuid"`
	Title string
	Description string
	Status string `gorm:"default:not_assigned"` // not assigned | in progress | finished
	WhereFrom string
	WhereTo string
	Distance float64
	Driver *Driver `gorm:"foreignKey:AssignedDriverID;references:DriverID"`
}