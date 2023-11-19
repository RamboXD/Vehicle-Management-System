package request

// import "github.com/RamboXD/SRS/models"

type VehicleAddInput struct {
	Name            string `json:"name" binding:"required"`
	Email           string `json:"email" binding:"required"`
	Password        string `json:"password" binding:"required,min=8"`
	Photo           string `json:"photo" binding:"required"`
}
