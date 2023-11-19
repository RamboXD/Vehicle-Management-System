package request

import "github.com/google/uuid"


type AssignRequest struct {
	DriverID  uuid.UUID `json:"driverId"`
	VehicleID uuid.UUID `json:"vehicleId"`
}

type UnassignRequest struct {
	VehicleID uuid.UUID `json:"vehicleId"`
}