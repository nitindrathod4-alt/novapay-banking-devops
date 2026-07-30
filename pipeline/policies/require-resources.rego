package novapay.resources

deny[msg] {
    input.kind.kind == "Pod"
    container := input.spec.containers[_]
    not container.resources.requests.cpu
    msg := "CPU requests must be specified."
}

deny[msg] {
    input.kind.kind == "Pod"
    container := input.spec.containers[_]
    not container.resources.requests.memory
    msg := "Memory requests must be specified."
}