# Find the Route 53 hosted zone
data "aws_route53_zone" "primary" {
  name         = var.domain_name
  private_zone = false
}

# Route 53 record that points your domain to the NGINX ELB
resource "aws_route53_record" "nginx_alias" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = var.nginx_elb_hostname
    zone_id                = var.nginx_elb_zone_id
    evaluate_target_health = true
  }
}
