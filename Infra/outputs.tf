output "jenkins_public_ip" {
  description = "Elastic IP of the Jenkins server"
  value       = aws_eip.jenkins_eip.public_ip
}

output "jenkins_url" {
  description = "Jenkins web UI URL"
  value       = "http://${aws_eip.jenkins_eip.public_ip}:8080"
}

