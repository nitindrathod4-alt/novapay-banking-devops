package novapay.images

deny[msg] {
    image := input.spec.containers[_].image
    endswith(image, ":latest")
    msg := "Using the latest image tag is prohibited."
}