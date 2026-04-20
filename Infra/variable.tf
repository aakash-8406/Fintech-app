variable "aws_region" {
  description = "AWS region to deploy Jenkins"
  type        = string
  default     = "ap-southeast-1"
}

variable "ami_id" {
  description = "Ubuntu 22.04 LTS AMI ID (update per region)"
  type        = string
  default     = "ami-0c7217cdde317cfec"
}

variable "instance_type" {
  description = "EC2 instance type for Jenkins"
  type        = string
  default     = "t3.medium"
}

variable "key_pair_name" {
  description = "Name of an existing EC2 key pair for SSH access"
  type        = string
}

variable "allowed_cidr_blocks" {
  description = "CIDR blocks allowed to reach Jenkins UI and SSH (restrict in production)"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}
