variable "region" {
  description = "AWS region"
  default     = "us-east-1"
}

variable "cluster_name" {
  description = "EKS cluster name"
  default     = "hello-eks-cluster"
}

variable "environment" {
  description = "Environment name"
  default     = "dev"
}
variable "domain_name" {
  description = "Custom domain name hosted in Route 53"
  type        = string
  default     = "sergeabroyan.com"
}

variable "nginx_elb_hostname" {
  description = "The DNS name of the NGINX LoadBalancer service"
  type        = string
}

variable "nginx_elb_zone_id" {
  description = "The Route 53 hosted zone ID for the ELB"
  type        = string
}


