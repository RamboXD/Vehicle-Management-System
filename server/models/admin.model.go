package models

import (
	"github.com/google/uuid"
)


type Admin struct {
    AdminID  uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
	UserID   uuid.UUID `gorm:"type:uuid;not null;onDelete:cascade"`
    User     User `gorm:"foreignkey:UserID"`
}

