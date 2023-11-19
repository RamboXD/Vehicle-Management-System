package models

import (
	"github.com/google/uuid"
)


type MaintenancePerson struct {
    MaintenancePersonID uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
	UserID   uuid.UUID `gorm:"type:uuid;not null;onDelete:cascade"`
    Name             string
    Surname          string
    MiddleName       string
    Qualifications      string
    Experience          string
    User                User `gorm:"foreignkey:UserID"`
}
