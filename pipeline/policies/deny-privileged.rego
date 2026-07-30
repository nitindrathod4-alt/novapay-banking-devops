package novapay.security

deny[msg] {
    input.kind.kind == "Pod"
    input.spec.containers[_].securityContext.privileged == true
    msg := "Privileged containers are not allowed."
}