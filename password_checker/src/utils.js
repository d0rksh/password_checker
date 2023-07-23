export const strongPasswordChecker = function(password) {
    const feedback = []
    const subs = Math.max(0, password.length - 20)
    const adds = Math.max(0, 6 - password.length)
    const lower = (password.match(/[a-z]/g) ?? []).length === 0 ? 1 : 0
    if(password.length > 20){
        feedback.push('Password must be less than 20 characters')
    }
    if(lower){
        feedback.push('Missing lowercase characters')
    }
    const upper = (password.match(/[A-Z]/g) ?? []).length === 0 ? 1 : 0
    if(upper){
        feedback.push('Missing uppercase characters')
    }
    const digit = (password.match(/[0-9]/g) ?? []).length === 0 ? 1 : 0
    if(digit){
        feedback.push('Missing digit')
    }
    const changes = lower + upper + digit

    let r = (password.match(/(.)\1{2,}/g) ?? []).length
    const repeat_words = r;
    if(repeat_words > 0){
        feedback.push('Repeated characters Found')
    }
    let steps = 0
    steps = Math.max(steps, r)
    steps = Math.max(steps, changes)
    steps = Math.max(steps, adds)
    steps = steps + subs
    return [steps,feedback]
}

export const SERVER_URL = 'http://127.0.0.1:5000/api/results';