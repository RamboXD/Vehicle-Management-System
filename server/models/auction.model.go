package models

import (
	"github.com/google/uuid"
)


type Auction struct {
    AuctionID     uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
    VehicleID     uuid.UUID `gorm:"type:uuid;not null"`
    PhysicalCondition string
    OtherInformation string
    VehicleImages string
}

