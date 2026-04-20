resource "google_container_cluster" "k8s_practice" {
  name     = "k8s-practice"
  location = var.region

  enable_autopilot              = true
  deletion_protection           = false
  in_transit_encryption_config  = "IN_TRANSIT_ENCRYPTION_DISABLED"

  release_channel {
    channel = "REGULAR"
  }
}
