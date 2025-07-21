output "kubeconfig_command" {
  value = "aws eks --region ${var.region} update-kubeconfig --name ${module.eks.cluster_name}"
}

output "cluster_name" {
  value = module.eks.cluster_name
}

output "cluster_endpoint" {
  value = module.eks.cluster_endpoint
}

output "cluster_security_group_id" {
  value = module.eks.cluster_security_group_id
}

output "region" {
  value = var.region
}

output "vpc_id" {
  value = module.vpc.vpc_id
}
