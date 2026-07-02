# Kubernetes deployment (any cloud)

The site image (`ghcr.io/den-frie-vilje/m-path`) is a stateless, rootless nginx container serving the
prerendered SvelteKit build on port 8080. These plain manifests run it on **any** Kubernetes cluster —
GKE, EKS, AKS, DigitalOcean, Hetzner, k3s, kind — with no Helm and no provider lock-in. It is the
cloud-agnostic alternative to the Docker Compose model in `../deploy/` (same image, same port).

## Prerequisites

- An ingress controller: **ingress-nginx** (`ingressClassName: nginx`). Swap the class + annotations
  in `ingress.yaml` for your provider's controller if you use a different one.
- **cert-manager** with a `letsencrypt-prod` ClusterIssuer (for automatic TLS). Remove the
  `tls:` blocks + `cert-manager.io` annotations if TLS is terminated upstream (e.g. a cloud LB).
- DNS: point `m-path.co.uk` and `www.m-path.co.uk` at your ingress controller's external IP.

## Deploy

```sh
# 1. Namespace (kustomize also creates it, but the pull secret needs it first):
kubectl create namespace m-path

# 2. GHCR image pull secret — only needed if the GHCR package is private.
#    The repo (den-frie-vilje/m-path.co.uk) is public; if the published
#    package is public too, skip this step and drop imagePullSecrets from
#    deployment.yaml.
kubectl create secret docker-registry ghcr \
  --namespace m-path \
  --docker-server=ghcr.io \
  --docker-username=<github-username> \
  --docker-password=<github-PAT-with-read:packages>

# 3. Apply everything:
kubectl apply -k k8s/

# 4. Watch it come up:
kubectl -n m-path rollout status deploy/m-path
```

## Notes

- **Rollout to a new build:** the deploy CI publishes `:production-latest` (Cosign-signed). Either
  `kubectl -n m-path rollout restart deploy/m-path` (imagePullPolicy is `Always`), or — recommended —
  pin the signed digest in `kustomization.yaml` (`images[].digest`) and let Argo CD / Flux reconcile.
- **Security:** runs as non-root uid 101, read-only root filesystem, all capabilities dropped,
  `RuntimeDefault` seccomp; only `/tmp`, `/var/cache/nginx`, `/var/run` are writable (emptyDir).
- **Verify the image signature** (supply-chain gate, mirrors the compose pull-only agent):
  ```sh
  cosign verify ghcr.io/den-frie-vilje/m-path:production-latest \
    --certificate-identity-regexp '^https://github.com/den-frie-vilje/.+' \
    --certificate-oidc-issuer https://token.actions.githubusercontent.com
  ```
  Enforce it in-cluster with a policy controller (Kyverno / Sigstore policy-controller) if desired.
- **Editor:** the production image is built with `STRIP_EDITOR=true`, so `/admin` is not served here.
