package request

import (
	"time"

	"github.com/google/uuid"
)

type FuelRequest struct {
	VehicleID           uuid.UUID `json:"vehicleId"`
	FuelingDate         time.Time `json:"fuelingDate"`
	FuelQuantity        float64   `json:"fuelQuantity"`
	FuelCost            float64   `json:"fuelCost"`
	GasStationName      string    `json:"gasStationName"`
	FuelType            string    `json:"fuelType"`
	OdometerReading     int       `json:"odometerReading"`
	FuelingReceiptImage string    `json:"fuelingReceiptImage"`
}
